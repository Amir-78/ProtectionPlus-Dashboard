import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { 
  HomePage, 
  ServersPage, 
  DashboardPage, 
  ConfigPage, 
  AutorolePage,
  WelcomerPage, 
  LogsPage, 
  SuggestionsPage, 
  VoiceOnlinePage, 
  BackgroundPage,
  ProfilePage,
  ProtectionPage
} from './pages'

function App() {

  return (
    <Switch>

      <Route path="/" exact={ true } component={ HomePage } />

      <Route path="/dashboard" exact={ true } component={ ServersPage } />
      <Route path="/background" exact={ true } component={ BackgroundPage } />
      <Route path="/profile" exact={ true } component={ ProfilePage } />

      <Route path="/dashboard/:guildID" exact={ true } component={ DashboardPage } />
      <Route path="/dashboard/:guildID/config" exact={ true } component={ ConfigPage } />
      <Route path="/dashboard/:guildID/autorole" exact={ true } component={ AutorolePage } />
      <Route path="/dashboard/:guildID/welcomer" exact={ true } component={ WelcomerPage } />
      <Route path="/dashboard/:guildID/logs" exact={ true } component={ LogsPage } />
      <Route path="/dashboard/:guildID/suggestions" exact={ true } component={ SuggestionsPage } />
      <Route path="/dashboard/:guildID/voiceonline" exact={ true } component={ VoiceOnlinePage } />
      <Route path="/dashboard/:guildID/protection" exact={ true } component={ ProtectionPage } />

    </Switch>
  );
}

export default App;