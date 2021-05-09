import './App.css';
import Header from './components/common/Header';
import ProductList from './components/admin/Product';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="wrapper center">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
