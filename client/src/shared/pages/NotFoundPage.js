import { NotFound } from "@/shared/components/organisms";
export default function NotFoundPage({title, description, linkText, buttonText, route,router}) {
  return (

      <NotFound
        title={title}
        description={description}
        linkText={linkText}
        router={router}
        buttonText={buttonText}
        route={route}
      />

  );
}
