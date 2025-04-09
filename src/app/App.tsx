import Header from "../components/Header";
import SearchInput from "../features/search/components/SearchInput/SearchInput";
import Toolbar from "../features/toolbar/components/Toolbar/Toolbar";
import UserList from "../features/users/components/UserList/UserList";

function App() {
  return (
    <div className="app__container">
      <Header />
      <SearchInput />
      <Toolbar />
      <UserList />
    </div>
  );
}

export default App;
