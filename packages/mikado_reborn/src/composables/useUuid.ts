import { v4 as uuidv4 } from 'uuid'; // Assurez-vous d'installer uuid : npm install uuid

export default function useUuid() {
  const generateUUID = () => uuidv4();

  return { generateUUID };
}
