var app = require('app')
var Menu = require('menu')
var path = require('path')

var config = require('ssb-config')
var windows = require('./lib/windows')

// Report crashes to our server.
//require('crash-reporter').start();

app.on('ready', function ready () {
  // start sbot
  require('scuttlebot').init(config, function (err, sbot) {
    // register sbot plugins
    sbot.use(require('phoenix-api'))
    
    // setup electron
    var blobs = require('./lib/blobs')(sbot, app.getPath('userDesktop'))
    require('protocol').registerProtocol('blob', blobs.protocol)
    var mainWindow = windows.open(
      'file://' + path.join(__dirname, '../node_modules/ssbplug-phoenix/home.html'),
      sbot,
      blobs,
      { width: 1000, height: 720 }
    )
    require('./lib/menu')(mainWindow)
    // mainWindow.openDevTools()

    // setup menu
    // Menu.setApplicationMenu(Menu.buildFromTemplate([{
    //   label: 'Window',
    //   submenu: [
    //     // { label: 'Open Web App', click: onopen },
    //     { label: 'Quit', click: onquit }
    //   ]
    // }]))

  })
});