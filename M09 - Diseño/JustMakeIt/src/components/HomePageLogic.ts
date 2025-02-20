import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { settingsOutline } from 'ionicons/icons';

export function usePageLogic() {
  const router = useRouter();
  const showHeader = ref(false);
  const showButtons = ref(false);

  // Animaciones al cargar la página
  onMounted(() => {
    setTimeout(() => (showHeader.value = true), 500);
    setTimeout(() => (showButtons.value = true), 2000);
  });

  // Navegación entre páginas
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Manejo del botón de ajustes
  const openSettings = () => {
    console.log('Abrir configuración');
    // Aquí iría la lógica para mostrar un modal o cambiar de página
  };

  return {
    showHeader,
    showButtons,
    settingsOutline,
    navigateTo,
    openSettings,
  };
}
