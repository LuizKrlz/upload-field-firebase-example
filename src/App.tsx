import { Controller, useForm } from "react-hook-form";
import { UploadInput } from "./components/upload-input";
import { makeId } from "./utils/make-id";

const userId = makeId();

function App() {
  const { control } = useForm();

  return (
    <div className="h-screen bg-background">
      <div className="max-w-lg lg:max-w-7xl mx-auto w-full py-4 flex gap-8">
        <div className="flex-1">
          <h1 className="text-2xl mb-20">Upload Example</h1>
          <Controller
            control={control}
            name="files"
            render={({ field }) => <UploadInput {...field} userId={userId} />}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
