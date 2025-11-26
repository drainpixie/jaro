{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    hooks,
  }: let
    supportedSystems = ["x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin"];

    forEachSupportedSystem = f:
      nixpkgs.lib.genAttrs supportedSystems (system:
        f {
          pkgs = nixpkgs.legacyPackages.${system};
          inherit system;
        });
  in {
    devShells = forEachSupportedSystem ({
      pkgs,
      system,
    }: let
      check = self.checks.${system}.pre-commit;
    in {
      default = pkgs.mkShell {
        inherit (check) shellHook;

        buildInputs =
          check.enabledPackages
          ++ (builtins.attrValues {
            inherit (pkgs) nodejs;
            inherit (pkgs.nodePackages) pnpm;
          });
      };
    });

    checks = forEachSupportedSystem ({
      pkgs,
      system,
    }: {
      pre-commit = hooks.lib.${system}.run {
        src = ./.;
        package = pkgs.prek;

        hooks = {
          eslint = {
            enable = true;
            entry = "pnpm eslint";
            files = "\\.(ts|js|tsx|jsx)$";
          };

          prettier = {
            enable = true;
            excludes = ["flake.lock"];
          };

          convco.enable = true;
          statix.enable = true;
          alejandra.enable = true;
        };
      };
    });

    formatter = forEachSupportedSystem ({pkgs, ...}: pkgs.alejandra);
  };
}
