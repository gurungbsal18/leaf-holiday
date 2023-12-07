import PackageCard from "@/components/PackageCard";
import "./scss/_home.scss";
import image from "../../public/images/km.png";

export default function Home() {
  return (
    <div>
      <h1>leaf holiday</h1>
      <PackageCard
        imageUrl={image}
        address={"kailash"}
        rating={5}
        review={5}
        title={"Kailash Mansarowar"}
        duration={14}
        price={1090}
      />
      <PackageCard
        imageUrl={image}
        address={"kailash"}
        rating={4.5}
        review={5}
        title={"Kailash Mansarowar"}
        duration={14}
        price={1090}
      />
      <PackageCard
        imageUrl={image}
        address={"kailash"}
        rating={2}
        review={5}
        title={"Kailash Mansarowar"}
        duration={14}
        price={1090}
      />
    </div>
  );
}
