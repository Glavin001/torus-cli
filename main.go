package main

import (
	"os"

	"github.com/urfave/cli"

	"github.com/arigatomachine/cli/cmd"
	"github.com/arigatomachine/cli/config"
)

func main() {
	cli.VersionPrinter = func(ctx *cli.Context) {
		cmd.VersionLookup(ctx)
	}

	app := cli.NewApp()
	app.Version = config.Version
	app.Usage = "A secure, shared workspace for secrets"
	app.Commands = cmd.Cmds
	app.Run(os.Args)
}
