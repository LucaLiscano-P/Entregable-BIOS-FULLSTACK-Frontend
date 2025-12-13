import { useParams } from "react-router-dom";
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Sidebar } from "../components/SideBarCategory"
import PostsByCategory from "../components/PostsByCategory";

function ProductsbyCategoryPage() {
      const { id } = useParams<{ id: string }>();
      console.log("Categoría ID:", id);
  return (
      <>
      <Header/>
      <div className="flex min-h-screen bg-linear-to-b from-[#1e1e1e] to-[#252526]">
        <Sidebar setActiveTab={() => {}} />
        <div className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-12">
          <PostsByCategory/>
      </div>
      </div>
      <Footer/>
      </>
    )
}

export default ProductsbyCategoryPage