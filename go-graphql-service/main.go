package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello from Go!")
}

func main() {
    // Grab PORT from the environment or default to 8080
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    http.HandleFunc("/", handler)
    log.Printf("Listening on port %s\n", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}
