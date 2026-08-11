import { NotFound } from "@/shared/components/organisms";
export default function NotFoundPage({title, description, linkText, buttonText, route}) {
  return (

      <NotFound
        title={title}
        description={description}
        linkText={linkText}
        buttonText={buttonText}
        route={route}
      />

  );
}
