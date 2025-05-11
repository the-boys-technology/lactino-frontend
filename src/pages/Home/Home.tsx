import '../../css/mainpage.css'
import Dashboard from "../../components/Dashboard";
import Header from "../../components/Header";


export function Home() {
    return (
        <>
    <Header />
      <main className="app__main">
        <Dashboard/>
      </main>
    </>
    )
}