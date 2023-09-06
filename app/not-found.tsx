import LinkButton from "@/components/linkButton";

export default function NotFound() {
  return (
    <div>
      <div className="text-center">
        <h4 className="mt-3 font-semibold text-gray-800 text-xl">
          404 - Not Found
        </h4>
        <p className="mt-4 text-gray-500 ">Could not find requested resource</p>

        <div className="mt-6">
          <LinkButton href="/">Back to Home</LinkButton>
        </div>
      </div>
    </div>
  );
}
