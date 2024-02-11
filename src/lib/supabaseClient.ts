import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function logIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      throw error;
    }

    const user = data.user;

    const { data: eventsData, error: eventsError } = await supabase
      .from("Activity")
      .select("*")
      .eq("user_id", user.id);

    if (eventsError) {
      throw eventsError;
    }

    console.log(eventsData);

    return { user };
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}
