import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { load } from "https://esm.sh/cheerio@1.0.0-rc.12";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ComicBook {
  number: number;
  title: string;
  state: string | null;
  owned: boolean;
  favorite: boolean;
}

Deno.serve(async (req) => {
  try {
    // Verify cron secret to ensure request is legitimate
    const authHeader = req.headers.get("Authorization");
    if (authHeader !== `Bearer ${Deno.env.get("CRON_SECRET")}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Fetch the webpage
    const response = await fetch("https://depoort.com/nl/1348-jommeke");
    const html = await response.text();
    const $ = load(html);

    const newComics: ComicBook[] = [];

    // Parse only future release comic listings
    $(".product").each((_, element) => {
      // Check if it's a future release
      const isFutureRelease =
        $(element).find(".product-flag.future_release").length > 0;
      if (!isFutureRelease) return;

      // Get the number from .link-reeks
      const reeksText = $(element).find(".link-reeks").text().trim();
      const numberMatch = reeksText.match(/(\d+)$/);
      if (!numberMatch) return;
      const number = parseInt(numberMatch[1]);
      if (isNaN(number)) return;

      // Get the title from .h3
      const title = $(element).find(".h3").text().trim();
      if (!title) return;

      // Add the comic with null state and not owned
      newComics.push({
        number,
        title,
        state: null,
        owned: false,
        favorite: false,
      });
    });

    if (newComics.length === 0) {
      return new Response("No new future releases found", { status: 200 });
    }

    // Get existing comic numbers
    const { data: existingComics } = await supabase
      .from("comic_books")
      .select("number");

    const existingNumbers = new Set(existingComics?.map((c) => c.number));

    // Filter to only new comics
    const upcomingComics = newComics.filter(
      (comic) => !existingNumbers.has(comic.number)
    );

    if (upcomingComics.length === 0) {
      return new Response("No new upcoming comics to add", { status: 200 });
    }

    // Insert new comics
    const { error } = await supabase.from("comic_books").insert(upcomingComics);

    if (error) throw error;

    return new Response(
      JSON.stringify({
        message: `Added ${upcomingComics.length} new upcoming comics`,
        comics: upcomingComics,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(error.message, { status: 500 });
  }
});
