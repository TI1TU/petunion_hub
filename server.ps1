$port = 8080
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
$listener.Start()
Write-Host "Listening on port $port over TCP..."

while ($true) {
    $client = $listener.AcceptTcpClient()
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $writer = New-Object System.IO.StreamWriter($stream)
    
    # Read Request Line
    $requestLine = $reader.ReadLine()
    if (-not $requestLine) { $client.Close(); continue }
    
    $parts = $requestLine.Split(" ")
    if ($parts.Length -lt 2) { $client.Close(); continue }
    $path = $parts[1]
    
    if ($path -eq "/") { $path = "/index.html" }
    
    # Remove query string
    if ($path.Contains("?")) {
        $path = $path.Substring(0, $path.IndexOf("?"))
    }
    
    $localPath = Join-Path $PWD $path.Replace("/", "\")
    
    # Read remaining headers (optional, mostly ignore)
    while ($true) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($line)) { break }
    }
    
    try {
        if (Test-Path $localPath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($localPath)
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = "text/plain"
            switch ($ext) {
                ".html" { $contentType = "text/html" }
                ".css"  { $contentType = "text/css" }
                ".js"   { $contentType = "application/javascript" }
                ".svg"  { $contentType = "image/svg+xml" }
                ".png"  { $contentType = "image/png" }
                ".jpg"  { $contentType = "image/jpeg" }
            }
            
            $writer.WriteLine("HTTP/1.1 200 OK")
            $writer.WriteLine("Content-Type: $contentType")
            $writer.WriteLine("Content-Length: " + $content.Length)
            $writer.WriteLine("Connection: close")
            $writer.WriteLine("")
            $writer.Flush()
            
            $stream.Write($content, 0, $content.Length)
            $stream.Flush()
        } else {
            $writer.WriteLine("HTTP/1.1 404 Not Found")
            $writer.WriteLine("Connection: close")
            $writer.WriteLine("")
            $writer.WriteLine("File not found")
            $writer.Flush()
        }
    } catch {
        $writer.WriteLine("HTTP/1.1 500 Internal Server Error")
        $writer.WriteLine("Connection: close")
        $writer.WriteLine("")
        $writer.Flush()
    }
    
    $client.Close()
}
