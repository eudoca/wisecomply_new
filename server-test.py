import socket
import time

PORT = 41234

# Try to create a server and bind it
try:
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('127.0.0.1', PORT))
    server.listen(5)
    print(f"Server successfully bound to 127.0.0.1:{PORT}")
    print(f"Try connecting to http://127.0.0.1:{PORT} in your browser")
    print("This server will exit in 60 seconds...")
    
    # Keep the server alive for a bit
    start_time = time.time()
    while time.time() - start_time < 60:
        # Accept connections with a short timeout
        server.settimeout(1)
        try:
            client, addr = server.accept()
            print(f"Client connected from {addr}")
            client.send(b"HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html><body><h1>Success!</h1><p>Python server is working!</p></body></html>")
            client.close()
        except socket.timeout:
            # Just a timeout, continue looping
            pass
        except Exception as e:
            print(f"Error accepting connection: {e}")
    
    server.close()
    print("Server closed")
    
except Exception as e:
    print(f"Failed to bind or listen: {e}")