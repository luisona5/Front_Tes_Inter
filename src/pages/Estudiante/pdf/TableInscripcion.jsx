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
    paddingHorizontal: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#2c3e50",
    backgroundColor: "#ffffff",
  },
  
  // HEADER
  header: {
    position: "absolute",
    top: 20,
    left: 30,
    right: 30,
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
    width: 50,
    height: 50,
  },
  
  logoRight: {
    width: 100,
    height: 50,
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
  
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
    color: "#003366",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  
  date: {
    fontSize: 9,
    color: "#9ca3af",
    marginBottom: 15,
    textAlign: "center",
  },
  
  // TABLA
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 25,
    alignItems: "center",
  },
  
  tableHeader: {
    backgroundColor: "#003366",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    minHeight: 30,
  },
  
  tableCell: {
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
    padding: 5,
    textAlign: "center",
    fontSize: 9,
    flexWrap: "wrap",
    overflow: "hidden",
  },
  
  col1: { width: "8%" },    // N°
  col2: { width: "23%" },   // Nombre
  col3: { width: "23%" },   // Apellido
  col4: { width: "28%" },   // Deporte
  col5: { width: "18%" },   // Estado
  
  textWrap: {
    fontSize: 9,
    lineHeight: 1.3,
  },
  
  statusAprobada: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: 3,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "bold",
  },
  
  statusPendiente: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: 3,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "bold",
  },
  
  statusRechazada: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: 3,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "bold",
  },
  
  totalDirectores: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 5,
    textAlign: "center",
  },
  
  totalText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151",
  },
  
  // FOOTER
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: "#003366",
    paddingTop: 10,
  },
  
  footerLine: {
    fontSize: 7,
    color: "#666",
    textAlign: "center",
  },

  noData: {
    padding: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
});

const TablaInscripcionPDF = ({ inscripciones }) => {
  const fechaActual = new Date().toLocaleDateString("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const getEstadoStyle = (estado) => {
    switch(estado) {
      case 'Aprobada':
        return styles.statusAprobada;
      case 'Pendiente':
        return styles.statusPendiente;
      case 'Rechazada':
        return styles.statusRechazada;
      default:
        return styles.statusPendiente;
    }
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header} fixed>
          <Image style={styles.logoLeft} src={logoEPN} />
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>ESCUELA POLITÉCNICA NACIONAL</Text>
            <Text style={styles.headerTitle}>Escuela de Formación de Tecnólogos</Text>
            <Text style={styles.headerTitle}>ESFOT</Text>
            <Text style={styles.subtitle}>Lista de Inscripciones - Sistema Polisport</Text>
          </View>
          
          <Image style={styles.logoRight} src={logoESFOT} />
        </View>

        {/* TÍTULO */}
        <Text style={styles.title}>Registro de Inscripciones</Text>

        {/* Validación si no hay datos */}
        {!inscripciones || inscripciones.length === 0 ? (
          <View style={styles.noData}>
            <Text>No hay inscripciones registradas</Text>
          </View>
        ) : (
          <>
            {/* TABLA */}
            <View style={styles.table}>
              {/* Encabezado de la tabla */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.col1]}>N°</Text>
                <Text style={[styles.tableCell, styles.col2]}>Nombre</Text>
                <Text style={[styles.tableCell, styles.col3]}>Apellido</Text>
                <Text style={[styles.tableCell, styles.col4]}>Deporte</Text>
                <Text style={[styles.tableCell, styles.col5]}>Estado</Text>
              </View>

              {/* Filas de datos */}
              {inscripciones.map((inscripcion, index) => (
                <View style={styles.tableRow} key={inscripcion._id || index} wrap={false}>
                  <Text style={[styles.tableCell, styles.col1]}>{index + 1}</Text>
                  
                  <Text style={[styles.tableCell, styles.col2, styles.textWrap]}>
                    {inscripcion.nombre || 'N/A'}
                  </Text>
                  
                  <Text style={[styles.tableCell, styles.col3, styles.textWrap]}>
                    {inscripcion.apellido || 'N/A'}
                  </Text>
                  
                  <Text style={[styles.tableCell, styles.col4, styles.textWrap]}>
                    {inscripcion.deporte?.nombre || 'N/A'}
                  </Text>
                  
                  <View style={[styles.tableCell, styles.col5]}>
                    <Text style={getEstadoStyle(inscripcion.estado)}>
                      {inscripcion.estado || 'N/A'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Total de inscripciones */}
            <View style={styles.totalDirectores}>
              <Text style={styles.totalText}>
                Total de Inscripciones: {inscripciones.length}
              </Text>
            </View>
          </>
        )}
        <Text style={styles.date}>Fecha de generación: {fechaActual}</Text>
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

export default TablaInscripcionPDF;