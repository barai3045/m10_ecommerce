export const Fetcher = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const res = await fetch(url);
    return await res.json();
}