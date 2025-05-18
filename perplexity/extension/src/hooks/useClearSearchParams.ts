import { useSearchParams } from "react-router-dom";

export default function useClearSearchParams({
  enabled,
}: {
  enabled: boolean;
}) {
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (enabled) {
      setSearchParams(new URLSearchParams());
    }
  }, [enabled, setSearchParams]);
}
