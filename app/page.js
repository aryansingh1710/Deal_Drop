import { Button } from "@/components/ui/button";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "@/actions";
import ProductCard from "@/components/ProductCard";
import { Bell, Rabbit, Shield, TrendingDown } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // User logged in hai toh products lao, varna empty array
  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description: "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description: "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white text-gray-900">
      {/* Navbar */}
      <header className="bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/deal-drop-logo.png"
              alt="Deal Drop Logo"
              width={150}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </div>
          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in">
            <span>Made with ❤️ by Aryan</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Never Miss a <span className="text-orange-500">Price Drop</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track prices from any e-commerce site. Get instant alerts when prices
            drop and save money effortlessly.
          </p>

          <div className="max-w-3xl mx-auto mb-16">
            <AddProductForm user={user}/>
          </div>

          {/* Features - Sirf tab dikhenge jab products na ho */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dashboard Section */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Your Watchlist</h3>
              <p className="text-sm text-gray-500">Managing {products.length} active trackers</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-24 text-center">
          <div className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 p-16">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
               <TrendingDown className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Your list is looking a bit lonely
            </h3>
            <p className="text-gray-500">
              Paste a product link in the box above to start tracking!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}