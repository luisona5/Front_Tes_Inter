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
    paddingTop: 120,
    paddingBottom: 80,
    paddingHorizontal: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#2c3e50",
    backgroundColor: "#ffffff",
  },
  header: {
    position: "absolute",
    top: 20,
    left: 30,
    right: 30,
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
    width: 60,
    height: 60,
  },
  logoRight: {
    width: 80,
    height: 60,
  },
  headerTextContainer: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0055a5",
    textAlign: "center",
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#003366",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Estilos de la tabla
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#003366",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableHeader: {
    backgroundColor: "#003366",
    color: "#ffffff",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 8,
    fontSize: 9,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  // Anchos de columnas
  col1: {
    width: "8%",
  },
  col2: {
    width: "18%",
  },
  col3: {
    width: "22%",
  },
  col4: {
    width: "16%",
  },
  col5: {
    width: "16%",
  },
  col7: {
    width: "12%",
  },
  // Estados
  statusActive: {
    color: "#10b981",
    fontWeight: "bold",
    fontSize: 8,
  },
  statusInactive: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 8,
  },
  // Total de deportes
  totalDeportes: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f0f9ff",
    borderLeftWidth: 4,
    borderLeftColor: "#003366",
    borderRadius: 4,
  },
  totalText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#003366",
  },
  generated: {
    marginTop: 20,
    fontSize: 8,
    textAlign: "right",
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#003366",
    paddingTop: 8,
  },
  footerLine: {
    fontSize: 7,
    color: "#7f8c8d",
    marginBottom: 2,
  },
});

const SimpleSportPDF = ({ deportes }) => {
  // Validación: si deporte no existe o no es un array
  if (!deportes || !Array.isArray(deportes) || deportes.length === 0) {
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
      <Page  orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <Image style={styles.logoLeft} src={logoEPN} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>ESCUELA POLITÉCNICA NACIONAL</Text>
            <Text style={styles.headerTitle}>Escuela de Formación de Tecnólogos - ESFOT</Text>
            <Text style={styles.subtitle}>Listado de Deportes</Text>
          </View>
          <Image style={styles.logoRight} src={logoESFOT} />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Polisport</Text>

        {/* Tabla */}
        <View style={styles.table}>
          {/* Encabezado de la tabla */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.col1, { color: "#ffffff" }]}>N°</Text>
            <Text style={[styles.tableCell, styles.col2, { color: "#ffffff" }]}>Categoría</Text>
            <Text style={[styles.tableCell, styles.col3, { color: "#ffffff" }]}>Nombre</Text>
            <Text style={[styles.tableCell, styles.col4, { color: "#ffffff" }]}>Fecha Inicio</Text>
            <Text style={[styles.tableCell, styles.col5, { color: "#ffffff" }]}>Fecha Fin</Text>
            <Text style={[styles.tableCell, styles.col7, { color: "#ffffff" }]}>Estado</Text>
          </View>

          {/* Filas de datos */}
          {deportes.map((deporte, index) => (
            <View style={styles.tableRow} key={deporte._id || index}>
              <Text style={[styles.tableCell, styles.col1]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.col2]}>{deporte.categoria?.nombre || "N/A"}</Text>
              <Text style={[styles.tableCell, styles.col3]}>{deporte.nombre || "N/A"}</Text>
              <Text style={[styles.tableCell, styles.col4]}>
                {deporte.fechaInicio 
                  ? new Date(deporte.fechaInicio).toLocaleDateString("es-EC", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "N/A"}
              </Text>
              <Text style={[styles.tableCell, styles.col5]}>
                {deporte.fechaFin
                  ? new Date(deporte.fechaFin).toLocaleDateString("es-EC", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "N/A"}
              </Text>
              <View style={[styles.tableCell, styles.col7]}>
                <Text style={deporte.estadoDeporte ? styles.statusActive : styles.statusInactive}>
                  {deporte.estadoDeporte ? "Activo" : "Inactivo"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total de deportes */}
        <View style={styles.totalDeportes}>
          <Text style={styles.totalText}>
            Total de deportes: {deporte.length}
          </Text>
        </View>

        {/* GENERATED DATE */}
        <Text style={styles.generated}>Generado: {fechaHora}</Text>

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