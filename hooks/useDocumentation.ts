import axios from "axios";
import { useQuery } from "react-query";

const fetchDocumentation = async (slug: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/api/documentation?filters[slug][$eq]=${slug}`
  );
};

const useDocumentation = (slug: string) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["documentation", slug],
    async () => {
      const res = await fetchDocumentation(slug);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    }
  );

  return { data, isLoading, isFetching, refetch };
};

export default useDocumentation;
