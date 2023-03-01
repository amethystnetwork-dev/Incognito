/*
  _____                   _                _     _                                                                      
 |  __ \                 | |              | |   | |                                                                     
 | |__) |   ___    _ __  | |_    ___    __| |   | |__    _   _                                                          
 |  ___/   / _ \  | '__| | __|  / _ \  / _` |   | '_ \  | | | |                                                         
 | |      | (_) | | |    | |_  |  __/ | (_| |   | |_) | | |_| |                                                         
 |_|       \___/  |_|     \__|  \___|  \__,_|   |_.__/   \__, |                                                         
                                                          __/ |                                                         
                                                         |___/                                                          
                                _     _                     _       _   _          _                               _    
     /\                        | |   | |                   | |     | \ | |        | |                             | |   
    /  \     _ __ ___     ___  | |_  | |__    _   _   ___  | |_    |  \| |   ___  | |_  __      __   ___    _ __  | | __
   / /\ \   | '_ ` _ \   / _ \ | __| | '_ \  | | | | / __| | __|   | . ` |  / _ \ | __| \ \ /\ / /  / _ \  | '__| | |/ /
  / ____ \  | | | | | | |  __/ | |_  | | | | | |_| | \__ \ | |_    | |\  | |  __/ | |_   \ V  V /  | (_) | | |    |   < 
 /_/    \_\ |_| |_| |_|  \___|  \__| |_| |_|  \__, | |___/  \__|   |_| \_|  \___|  \__|   \_/\_/    \___/  |_|    |_|\_\
                                               __/ |                                                                    
                                              |___/                                                                     
*/
function community(app) {
    app.search.title.style.display = 'block';
    app.search.title.textContent = 'Community';
    app.search.input.style.display = 'none';
    app.main.support = app.createElement(
        'div', 
        [
            app.createElement('section', [
                app.createElement('p', 'You are being taken to the Amethyst Network server (discord.gg/fzrmxgu2NR).', {
                        style: {
                            'margin-bottom': '0'
                        }
                    }),
                    app.createElement('p', 'Are you sure you want to <a href="https://discord.gg/fzrmxgu2NR">proceed</a>?', {
                        style: {
                            'margin-bottom': '0'
                        }
                    }),
            ], {
                class: 'data-section'
            }),
            
        ]);
        app.search.back.style.display = 'inline';
    app.search.back.setAttribute(
        'onclick',
        '(' + (function(){
            window.location.hash = '';
        }).toString() + ')();'
    )
};

export { community };
