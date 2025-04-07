package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq"

	"github.com/AdityaKumar0927/setup/go-graphql-service/graph"
)

func main() {
	dbURL := os.Getenv("POSTGRES_HOST")
	if dbURL == "" {
		log.Fatal("Missing POSTGRES_HOST env var.")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Failed to connect DB: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("DB ping failed: %v", err)
	}

	schema := graph.NewExecutableSchema(db)

	http.Handle("/query", schema)
	http.Handle("/", playground.Handler("GraphQL Playground", "/query"))

	port := "8080"
	fmt.Printf("Go GraphQL server on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
