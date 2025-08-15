import React, { useEffect, useState } from "react";

export const ConnectedEmulatorIndicator = () => {
  const [connectedInEmulator, setConnectedInEmulator] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem("connectedEmulator");

    if (item && parseInt(item, 10) > 0) {
      setConnectedInEmulator(true);
    }

    return () => {
      localStorage.removeItem("connectedEmulator");
    };
  }, []);

  if (!connectedInEmulator) return <></>;

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-orange-500 text-white py-3 px-4 text-center font-semibold text-sm shadow-md z-50 tracking-wider"
      title="Connected to Firebase Emulator"
    >
      🔥 Connected to Emulator
    </div>
  );
};
