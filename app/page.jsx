import { Button } from "@/components/ui/button";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "@/actions";
import ProductCard from "@/components/ProductCard";
import { Bell, Rabbit, Shield, TrendingDown } from "lucide-react"; // Added TrendingDown

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-orange-500/30">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={"/deal-drop-logo.png"}
              alt="Deal Drop Logo"
              width={600}
              height={200}
              className="h-10 w-auto brightness-0 invert" // Inverts logo for dark theme
            />
          </div>
          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-6 py-2 rounded-full text-sm font-medium mb-8">
            Made with ❤️ by Aryan
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Never Miss a <span className="text-orange-500">Price Drop</span>
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Track prices from any e-commerce site. Get instant alerts when prices
            drop. Save money effortlessly.
          </p>

          <div className="max-w-3xl mx-auto">
            <AddProductForm user={user}/>
          </div>

          {/* Feature Grid - Only shows if no products */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group bg-white/[0.03] p-8 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-32">
          <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-3xl font-bold text-white">Your Dashboard</h3>
              <p className="text-gray-500 mt-1">Monitoring your selected items in real-time</p>
            </div>
            <span className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-sm font-medium text-orange-400">
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-32 text-center">
          <div className="bg-white/[0.02] rounded-3xl border-2 border-dashed border-white/10 p-16">
            <TrendingDown className="w-20 h-20 text-gray-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Your watchlist is empty
            </h3>
            <p className="text-gray-500 text-lg">
              Paste a URL above to start saving money.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}