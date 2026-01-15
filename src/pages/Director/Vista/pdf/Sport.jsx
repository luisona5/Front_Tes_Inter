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
    paddingBottom: 90,
    paddingHorizontal: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#2c3e50",
    backgroundColor: "#ffffff",
  },
  header: {
    position: "absolute",
    top: 20,
    left: 50,
    right: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#003366",
    paddingBottom: 12,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  logoLeft: {
    width: 50,
    height: 50,
  },
  logoRight: {
    width: 85,
    height: 45,
  },
  headerTextContainer: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#003366",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
   fontSize: 10,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#003366",
    padding: 8,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionBox: {
    marginBottom: 18,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderLeftWidth: 4,
    borderLeftColor: "#0055a5",
  },
  label: {
    fontWeight: "bold",
    width: "40%",
    color: "#003366",
    fontSize: 10,
  },
  value: {
    width: "60%",
    color: "#2c3e50",
    fontSize: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    paddingVertical: 3,
  },
  generated: {
    marginTop: 30,
    fontSize: 9,
    textAlign: "right",
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 50,
    right: 50,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#003366",
    paddingTop: 10,
  },
  footerLine: {
    fontSize: 8,
    color: "#7f8c8d",
    marginBottom: 3,
  },
});

const SimpleSportPDF = ({ deporte }) => {
  if (!deporte) {
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
            <Text style={styles.headerTitle}>Escuela de Formación de Tecnólogos </Text>
            <Text style={styles.headerTitle}> ESFOT</Text>

            <Text style={styles.subtitle}>Informe Detallado del Deporte</Text>

          </View>
          <Image style={styles.logoRight} src={logoESFOT} />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Polisport</Text>

        {/* BASIC INFORMATION */}
        <Text style={styles.sectionTitle}>Información General</Text>
        <View style={styles.sectionBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre del deporte:</Text>
            <Text style={styles.value}>{deporte.nombre || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.value}>{deporte.detalle || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Categoría:</Text>
            <Text style={styles.value}>{deporte.categoria?.nombre || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Descripción categoría:</Text>
            <Text style={styles.value}>{deporte.categoria?.descripcion || "N/A"}</Text>
          </View>
        </View>

        {/* DATES AND TIMES */}
        <Text style={styles.sectionTitle}>Período de Inscripción y Disponibilidad</Text>
        <View style={styles.sectionBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de inicio:</Text>
            <Text style={styles.value}>
              {new Date(deporte.fechaInicio).toLocaleDateString("es-EC", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de cierre:</Text>
            <Text style={styles.value}>
              {new Date(deporte.fechaFin).toLocaleDateString("es-EC", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora de inicio:</Text>
            <Text style={styles.value}>{deporte.horaInicio || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hora de cierre:</Text>
            <Text style={styles.value}>{deporte.horaFin || "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cupos disponibles:</Text>
            <Text style={styles.value}>{deporte.cupo || "N/A"}</Text>
          </View>
        </View>

        {/* GENERATED DATE */}
        <Text style={styles.generated}>
          Generado: {fechaHora}
        </Text>

        {/* FOOTER */}
        <View style={styles.footerContainer} fixed>
          <Text style={styles.footerLine}>
            Edificio 21 | Email: diresfot@epn.edu.ec
          </Text>
          <Text style={styles.footerLine}>
            Av. Ladrón de Guevara E11-253, Quito - Ecuador
          </Text>
          <Text style={styles.footerLine}>
            Tel: (+593) 2 2976 300 | info@epn.edu.ec
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default SimpleSportPDF;