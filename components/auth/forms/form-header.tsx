export default function FormHeader({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center mb-4">
      <h1 className="text-3xl font-extralight">{title}</h1>
      {subTitle && (
        <p className="text-secondary text-md text-balance font-regular">
          {subTitle}
        </p>
      )}
    </div>
  );
}
