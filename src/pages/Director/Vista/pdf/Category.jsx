import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logoEPN from "/src/assets/Escuela_Politécnica_Nacional.png";
import logoESFOT from "/src/assets/esfot.png";

const styles = StyleSheet.create({
  page: {
    paddingTop: 100,
    paddingBottom: 80,
    paddingHorizontal: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#2c3e50",
    backgroundColor: "#ffffff",
  },
  
  // HEADER
  header: {
    position: "absolute",
    top: 20,
    left: 50,
    right: 50,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#003366",
    paddingBottom: 12,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  
  logoLeft: {
    width: 55,
    height: 55,
  },
  
  logoRight: {
    width: 110,
    height: 55,
  },
  
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  
  headerTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 2,
  },
  
  subtitle: {
    fontSize: 9,
    color: "#555",
    textAlign: "center",
    marginTop: 5,
    fontStyle: "italic",
  },
  
  // TÍTULO PRINCIPAL
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center",
    color: "#003366",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  
  // SECCIONES
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#003366",
    padding: 8,
    marginBottom: 12,
    marginTop: 15,
  },
  
  sectionBox: {
    marginBottom: 18,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderLeftWidth: 4,
    borderLeftColor: "#0055a5",
  },
  
  // FILAS DE DATOS
  row: {
    flexDirection: "row",
    marginBottom: 8,
    paddingVertical: 3,
  },
  
  label: {
    fontWeight: "bold",
    width: "35%",
    color: "#003366",
    fontSize: 10,
  },
  
  value: {
    width: "65%",
    color: "#2c3e50",
    fontSize: 10,
  },
  
  // BADGE DE ESTADO
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 3,
  },
  
  statusActive: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  
  statusInactive: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  
  statusText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  
  // FECHA DE GENERACIÓN
  generated: {
    marginTop: 25,
    fontSize: 8,
    textAlign: "right",
    color: "#999",
    fontStyle: "italic",
  },
  
  // FOOTER
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: "#003366",
    paddingTop: 10,
  },
  
  footerLine: {
    fontSize: 8,
    color: "#666",
    textAlign: "center",
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

  const fechaHora = new Date().toLocaleString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header} fixed>
          <Image style={styles.logoLeft} src={logoEPN} />
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>ESCUELA POLITÉCNICA NACIONAL</Text>
            <Text style={styles.headerTitle}>Escuela de Formación de Tecnólogos</Text>
            <Text style={styles.headerTitle}>ESFOT</Text>
            <Text style={styles.subtitle}>Informe Detallado de la Categoria</Text>
          </View>
          
          <Image style={styles.logoRight} src={logoESFOT} />
        </View>

        {/* TÍTULO PRINCIPAL */}
        <Text style={styles.title}>Polisport</Text>

        {/* INFORMACIÓN GENERAL */}
        <Text style={styles.sectionTitle}>Información de la Categoria</Text>
        <View style={styles.sectionBox}>
          <View style={styles.row}>
            <Text style={styles.label}>nombre:</Text>
            <Text style={styles.value}>{data.nombre || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{data.descripcion || "N/A"}</Text>
          </View>

        </View>

       
        
        {/* FECHA DE GENERACIÓN */}
        <Text style={styles.generated}>
          Documento generado el: {fechaHora}
        </Text>

        {/* FOOTER */}
        <View style={styles.footerContainer} fixed>
          <Text style={styles.footerLine}>
            Edificio 21 | Email: diresfot@epn.edu.ec | Av. Ladrón de Guevara E11-253, Quito - Ecuador | Tel: (+593) 2 2976 300 | info@epn.edu.ec
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default SimpleCategoryPDF;