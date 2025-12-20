package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/fugleadvokatene/bino/internal/config"
	"github.com/fugleadvokatene/bino/internal/handlers/handlerlogin"
)

func main() {
	config, err := config.Load("config.json")
	if err != nil {
		printAndDie(err)
	}
	if err := checkLoginPage("https://"+config.SystemBaseURL, handlerlogin.SignInWithGoogle); err != nil {
		printAndDie(err)
	}
	fmt.Printf("Login page is up\n")
}

func printAndDie(err error) {
	fmt.Println(err.Error())
	os.Exit(1)
}

func checkLoginPage(url string, wantedText string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if !strings.Contains(string(body), wantedText) {
		return fmt.Errorf("expected text not found in response body")
	}

	return nil
}
