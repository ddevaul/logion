export default function Test() {
  type Author = {
    id: string
    first_name: string
    last_name: string
    birth_year: number
    death_year: number
    genre: string
  }

	const callAPI = async (): Promise<void> => {
    try {
      const options = {
        method: 'GET',
      }
      const res = await fetch(`http://127.0.0.1:8000/api/comments/1`, options);
      const data:any = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

  };
	return (
		<div>
			<main>
				<button onClick={callAPI}>Make API call</button>
			</main>
		</div>
	);
}
