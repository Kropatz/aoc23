{
  description = "ente";

  inputs = {
    pkgs.url = "github:nixos/nixpkgs/nixos-23.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let 
        pkgs = nixpkgs.legacyPackages.${system};
        buildInputs = with pkgs; [ bun ];
      in 
      {
        devShells.default = pkgs.mkShell {
          inherit buildInputs;
        }; 

        # # Utilized by `nix flake check`
        # checks.x86_64-linux.test = c-hello.checks.x86_64-linux.test;
       
        # # Utilized by `nix build .`
        # defaultPackage.x86_64-linux = c-hello.defaultPackage.x86_64-linux;
     
        # # Utilized by `nix build`
        # packages.x86_64-linux.hello = c-hello.packages.x86_64-linux.hello;
     
        # # Utilized by `nix run .#<name>`
        # apps.x86_64-linux.hello = {
        #   type = "app";
        #   program = c-hello.packages.x86_64-linux.hello;
        # };
     
        # # Utilized by `nix bundle -- .#<name>` (should be a .drv input, not program path?)
        # bundlers.x86_64-linux.example = nix-bundle.bundlers.x86_64-linux.toArx;
     
        # # Utilized by `nix bundle -- .#<name>`
        # defaultBundler.x86_64-linux = self.bundlers.x86_64-linux.example;
     
        # # Utilized by `nix run . -- <args?>`
        # defaultApp.x86_64-linux = self.apps.x86_64-linux.hello;
     
        # # Utilized by `nix develop .#<name>`
        # devShells.x86_64-linux.example = self.devShell.x86_64-linux;
      }
    );
}
