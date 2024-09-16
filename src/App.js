import RoomList from "./components/RoomList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="text-center py-4 bg-white shadow-md fixed top-0 w-full z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Unravel WebApp
        </h1>
      </header>
      <main className="container mx-auto pt-20 sm:pt-24 p-4">
        <RoomList />
      </main>
    </div>
  );
}

export default App;
