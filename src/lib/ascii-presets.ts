interface ASCIIPreset {
  id: string;
  name: string;
  description: string;
  value: string;
}

const xellReloadedASCII = `
         ▄    ▄       ▄     ▄▄      ▄▄
        ▐█▌  ▐█▌    ▄█▀█▄   ██      ██
        ▐░▌  ▐░▌   ▐░▌ ▐░▌  ▌▐      ▌▐
  ▄▄▄▄▄ ▐▒▌  ▐▒▌ ▄ ▒▒ ▄▄▄▄▄ ▒▒ ▄▄▄▄ ▒▒ ▄▄▄▄▄
  ▓▓▓▓▓▄ ▐▓▌▐▓▌ ▄▓ ▓▓ ▀▀▓▓▓ ▓▓ ▓▓▓▓ ▓▓ ▓▓▓▓▓
  ▓▓▓▓▓▓▄ ▀██▀ ▄▓▓ ██▀▀ ▓▓▓ ██ ▓▓▓▓ ██ ▓▓▓▓▓
  ▀▀▀▀▀▀ ▄▒▀▀▒▄ ▀▀ ▒▒ ▀▀▀▀▀ ▒▒ ▀▀▀▀ ▒▒ ▀▀▀▀▀
        ▐▓▌  ▐▓▌   ▐▓▌ █▓▌  ▓▓      ▓▓
        ██    ██    ▀█▄█▀   ██      ██
        ▀▀    ▀▀      ▀     ▀▀▀▀▀▀▀ ▀▀▀▀▀▀▀
     ▄▄▄         ▄     ▄▄         ▄▄        ▄      ▄▄▄        ▄      ▄▄▄
    ██ ▀█▄     ▄█▀█▄   ██       ▄█▀▀█▄    ▄█▀█▄   ██ ▀█▄    ▄█▀█▄   ██ ▀█▄
    ▌▐  ▐░▌   ▐░▌ ▐░▌  ▌▐      ▐░▌  ▐░▌  ▐░▌ ▐░▌  ▌▐  ▐░▌  ▐░▌ ▐░▌  ▌▐  ▐░▌
  ▄ ▒▒ ▄ ▒▒ ▄ ▒▒ ▄▄▄▄▄ ▒▒ ▄▄▄▄ ▒▒ ▄▄ ▒▒▄ ▒▒ ▄ ▒▒▄ ▒▒ ▄ ▒▒▄ ▒▒ ▄▄▄▄▄ ▒▒ ▄ ▒▒
  ▓ ▓▓ ▀█▓▌ ▓ ▓▓ ▀▀▓▓▓ ▓▓ ▓▓▓▓ ▓▓ ▓▓ ▓▓▓ ▓▓ ▀ ▓▓▓ ▓▓ ▓ ▓▓▓ ▓▓ ▀▀▓▓▓ ▓▓ ▓ ▓▓
  ▓ ██▀█▀▀ ▄▓ ██▀▀ ▓▓▓ ██ ▓▓▓▓ ██ ▓▓ ██▓ ██▀▀▀██▓ ██ ▓ ██▓ ██▀▀ ▓▓▓ ██ ▓ ██
  ▀ ▒▒ ▀▒▄ ▀▀ ▒▒ ▀▀▀▀▀ ▒▒ ▀▀▀▀ ▒▒ ▀▀ ▒▒▀ ▒▒ ▀ ▒▒▀ ▒▒ ▀ ▒▒▀ ▒▒ ▀▀▀▀▀ ▒▒ ▀ ▒▒
    ▓▓  ▐▓▌   ▐▓▌ ▐▓▌  ▓▓      ▐▓▌  ▐▓▌  ▓▓   ▓▓  ▓▓  ▐▓▌  ▐▓▌ ▐▓▌  ▓▓  ▐▓▌
    ██   ██    ▀█▄█▀   ██       ▀█▄▄█▀   ██   ██  ██ ▄█▀    ▀█▄█▀   ██ ▄█▀
    ▀▀   ▀▀      ▀     ▀▀▀▀▀▀▀    ▀▀     ▀▀   ▀▀   ▀▀▀        ▀      ▀▀▀`;

const free60ASCII = `
   ######################################################
   #        ##########################       ####      ##
   #  ###############################  #####  ##   ##   #
   #  ###############################  #########  ####  #
   #  ########  #   ####   ####   ###       ####  ####  #
   #      ####    #  ##  #  ##  #  ##   ###  ###  ####  #
   #  ########  #######     ##     ##  #####  ##  ####  #
   #  ########  #######  #####  #####  #####  ##  ####  #
   #  ########  #######  #  ##  #  ###  ###   ##   ##   #
   #  ########  ########   ####   #####     #####      ##
   ######################################################
`;

const razor1911ASCII = `
         ▄▄▀▀▀▄
     ▄▄▀▀ ▄▄█  ▀▀▀▄▄▄▄
    █ ▄▄█████▄███▄▄▄▄ ▀█▄▄▄▄▄                   ▄█▀▀▀█    ▄▄▄
    ▀▄▄ ▀███▀ ▀▀██████▄ ▀▀▀▀▀▀▀▀█▄█▀▀▀▀▀▀▀▀▀▀▀██▀ ▄▀ █▄▄█▀ ▄ ▀▀▀▀▄▄
       █ ███    ▄█████▀ ▀▀▀████ ▀█ ▄█████████▄  ▄███▄ ▀ ▄▄██▄▀██▄▄ ▀▄
       █ ███  ▄██▀▀▀▀ ▄▀ ▄██▀███   ▀█▀   ▄██▀ ▄█▀ ▀███▄  ███   ▀███▄ █
       █ ███▄██▄  ▄▄██▀ ███ ▄ ███ ▀▄▄  ▄██▀ ▄██▄ ▀▄ ▀███▄███  ▄██▀▀ ▄▀
       █ ███▀████▄  ██ ███▀    ███ ▀ ▄██▀   ▄████▄ ▀ ▄█▀ ███▀██▄  ▄▀
       █ ███  ▀████▄  ▄███ ▄▄█▀▀███▄███▄▄▄▄███ ▀███▄█▀   ███  ▀██▄ ▀▄▄
     ▄▀ ▄███▄ ▄ ▀████▄▀██▀▀▀ ▄ ▀▀▀▀███▀▀▀▀▀▀▀  ▄ ▀█▀ ▄█ ▀▀▀▀▀ ▄ ▀██▄  ▀▀▄▄▄▄
    █▄ ▀▀▀▀▀▀▀ █▄ ▀█████▄▄ ▀▀▀▀▀██▄  ▀▀▄ ██▀▀▀██ ▀ ▄███▀▀▀▀▀▀▀▀▀▄ ▀▀██▄▄  ▄ ▀▄
  ▀▀▀█▀▀▀▀▀▀▀▀▀▀▀█▄▄▀▀███████▄▄▄   ▄▄▀ ▄▄█     █▀▀▀▀▀            ▀▀▄▄▄ ▀▀▀ ▄▀
                  ▀▀█▄▄▄ ▀▀▀▀█████▀▀ ▄█▀                              ▀▀▀▀▀
                      ▀▀▀▀▀▀▄▄▄▄▄▄▄▀▀                  ·  1·9·1·1  ·      <JeD>
`;

export const asciiPresets: ASCIIPreset[] = [
  {
    id: "xell-reloaded",
    name: "XeLL Reloaded",
    description: "The classic XeLL Reloaded logo",
    value: xellReloadedASCII,
  },
  {
    id: "free60",
    name: "Free60",
    description: "The Free60 project logo found in the original XeLL",
    value: free60ASCII,
  },
  {
    id: "razor1911",
    name: "Razor1911",
    description: "The Razor1911 warez and demogroup logo",
    value: razor1911ASCII,
  },
];

// Export the default ASCII art (XeLL Reloaded)
export const defaultASCII = xellReloadedASCII;
