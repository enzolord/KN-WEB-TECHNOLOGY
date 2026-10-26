// Vercel Edge Function — renvoie le pays du visiteur (déduit de son IP par
// Vercel, en-tête x-vercel-ip-country). Utilisé pour afficher les tarifs en
// FCFA (Afrique) ou en euros (autres continents). Aucune donnée n'est stockée.
export const config = { runtime: 'edge' };

export default function handler(request) {
  const country = request.headers.get('x-vercel-ip-country') || null;
  return new Response(JSON.stringify({ country }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Réponse propre à chaque visiteur : jamais mise en cache partagé
      'cache-control': 'private, no-store',
    },
  });
}
