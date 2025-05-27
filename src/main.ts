import "./style.css";
import typescriptLogo from "./typescript.svg";
import dayjs from "dayjs";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>TypeScript</h1>
  
  </div>
`;

type Ricetta = {
  id: number;
  name: string;
  userId: number;
};

type Chef = {
  id: number;
  firstName: string;
  lastName: string;
  userId: number;
  birthDate: string;
};

async function getChefBirthday(id: number): Promise<string> {
  try {
    const ricettaResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!ricettaResponse.ok) {
      throw new Error(
        `Errore HTTP ${ricettaResponse.status}: ${ricettaResponse.statusText}`
      );
    }
    const ricetta: Ricetta = await ricettaResponse.json();

    const chefResponse = await fetch(
      `https://dummyjson.com/users/${ricetta.userId}`
    );
    if (!chefResponse.ok) {
      throw new Error(
        `Errore HTTP ${chefResponse.status}: ${chefResponse.statusText}`
      );
    }
    const chef: Chef = await chefResponse.json();
    const newDate: string = dayjs(chef.birthDate).format("DD/MM/YYYY");
    return newDate;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error("Errore sconsociuto");
    }
  }
}

(async (): Promise<void> => {
  try {
    const birthday: string = await getChefBirthday(1);
    console.log(birthday);
  } catch (error) {
    if (error instanceof Error) {
      console.error("errore nel recupero dati", error);
    } else {
      console.error("Errore sconosciuto", error);
    }
  } finally {
    console.log("fine");
  }
})();
