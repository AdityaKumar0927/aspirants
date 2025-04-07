package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq"

	// If your module name is:
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

	// If the generics cause trouble, remove the cache line or match the type:
	// schema.SetQueryCache(lru.New) // or remove if it won't infer

	http.Handle("/query", schema)
	http.Handle("/", playground.Handler("GraphQL Playground", "/query"))

	port := "8080"
	fmt.Printf("Go GraphQL server on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
