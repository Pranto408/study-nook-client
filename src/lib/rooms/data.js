export const fetchRooms = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json(); 
    return data || [];
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return [];
  }
};



export const fetchFeaturedRooms = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();// ← await was missing
    return data || [];
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    return [];
  }
};