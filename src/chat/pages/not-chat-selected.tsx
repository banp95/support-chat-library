const NotChatSelected = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Selecciona un chat</h2>
        <p className="text-sm text-muted-foreground">
          Elige una conversación de la lista para comenzar a chatear
        </p>
      </div>
    </div>
  );
};
export default NotChatSelected;
