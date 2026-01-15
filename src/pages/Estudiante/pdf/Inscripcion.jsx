import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoEPN from "/src/assets/Escuela_Politécnica_Nacional.png";
import logoESFOT from "/src/assets/esfot.png";



const styles = StyleSheet.create({
  page: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontSize: 12,
  },

  header: {
    position: "absolute",
    top: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // imágenes a los extremos
  },
  logo: {
    width: 50,
    height: 50,
  },
  logo1: {
    width: 100,
    height: 50,
  },
  headerText: {
    position: "absolute",  // para centrar sin depender del espacio de las imágenes
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
  marginTop: 10,
  marginBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#000",
},

  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#777",
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 20,
    color: '#666',
  },

  section: {
    marginTop: 10,
    marginBottom: 5,
  },

  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

const SimpleCategoryPDF = ({ data }) => {
  if (!data) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No hay datos disponibles</Text>
        </Page>
      </Document>
    );
  }

  const fechaHora = new Date().toLocaleString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER con imagen y texto */}
        <View style={styles.header} fixed>
            {/*imagen lado izquierdo */}
          <Image
            style={styles.logo}
            src={logoEPN}
          />


          <Text style={styles.headerText}>POLISPORT</Text>  
            
            {/*imagen lado derecho */}
          <Image
            style={styles.logo1}
            src={logoESFOT}/>
        </View>

        <View style={styles.line} />

        {/* CONTENIDO (Body) */}
        <View>
          <Text style={styles.title}>Datos</Text>
          <Text style={styles.subtitle}>Generado: {fechaHora}</Text>

          <View style={styles.section}>
            <Text>
              <Text style={styles.label}>Nombre:</Text> {data.nombre|| 'N/A'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text>
              <Text style={styles.label}>Descripcion:</Text> {data.descripcion || 'N/A'}
            </Text>
          </View>

          
        </View>

        {/* FOOTER */}
        <Text style={styles.footer} fixed>
          Sistema de Gestión de Directores - Documento generado automáticamente
        </Text>

      </Page>
    </Document>
  );
};

export default SimpleCategoryPDF;
