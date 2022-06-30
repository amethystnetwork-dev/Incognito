{ pkgs }: {
	deps = [		pkgs.nodejs-16_x
         pkgs.brave
         pkgs.nodePackages.typescript-language-server
         pkgs.nodePackages.yarn
         pkgs.replitPackages.jest
        pkgs.nano
	];
}
