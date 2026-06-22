import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, getProductBySlug, saveProducts } from "@/lib/products";
import { Product } from "@/types/product";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (slug) {
    const product = getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }
    return NextResponse.json(product);
  }
  const products = getAllProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const products = getAllProducts();
    const newProduct: Product = {
      id: String(Date.now()),
      ...body,
      createdAt: new Date().toISOString().split("T")[0],
    };
    products.push(newProduct);
    saveProducts(products);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطأ في إنشاء المنتج" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "الرجاء توفير slug" }, { status: 400 });
    }

    const body = await req.json();
    const products = getAllProducts();
    const index = products.findIndex((p) => p.slug === slug);

    if (index === -1) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    products[index] = { ...products[index], ...body };
    saveProducts(products);
    return NextResponse.json(products[index]);
  } catch {
    return NextResponse.json({ error: "خطأ في تحديث المنتج" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "الرجاء توفير slug" }, { status: 400 });
    }

    let products = getAllProducts();
    products = products.filter((p) => p.slug !== slug);
    saveProducts(products);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطأ في حذف المنتج" }, { status: 400 });
  }
}