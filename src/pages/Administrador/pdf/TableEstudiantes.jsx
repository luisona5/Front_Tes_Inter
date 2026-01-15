// src/pages/Administrador/pdf/estudianteesTablePDF.jsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica'
    },
    header: {
        marginBottom: 20,
        textAlign: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
        alignSelf: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1f2937'
    },
    subtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 3
    },
    date: {
        fontSize: 9,
        color: '#9ca3af',
        marginBottom: 20
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        minHeight: 30,
        alignItems: 'center'
    },
    tableHeader: {
        backgroundColor: '#6b7280',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tableCell: {
        borderRightWidth: 1,
        borderRightColor: '#e5e7eb',
        padding: 5,
        textAlign: 'center'
    },
    col1: { width: '5%' },   // N°
    col2: { width: '20%' },  // Apellido
    col3: { width: '20%' },  // Nombre
    col4: { width: '10%' },  // Cédula
    col5: { width: '25%' },  // Email
    col6: { width: '10%' },  // Teléfono
    col7: { width: '10%' },  // Estado
    statusActive: {
        backgroundColor: '#dcfce7',
        color: '#166534',
        padding: 3,
        borderRadius: 3,
        fontSize: 8,
        fontWeight: 'bold'
    },
    statusInactive: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: 3,
        borderRadius: 3,
        fontSize: 8,
        fontWeight: 'bold'
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#9ca3af',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 10
    },
    totalestudiantes: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f3f4f6',
        borderRadius: 5,
        textAlign: 'center'
    },
    totalText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#374151'
    }
});

const EstudiantesTablePDF = ({ estudiantes }) => {
    const fechaActual = new Date().toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <Document>
                                        {/*para horizontal poner "landscape" y si quiero vertical "portail" */}
            <Page size="A4" orientation="portrait" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Lista de estudiantees de Eventos</Text>
                    <Text style={styles.subtitle}>Escuela Politécnica Nacional</Text>
                    <Text style={styles.date}>Generado el: {fechaActual}</Text>
                </View>

                {/* Tabla */}
                <View style={styles.table}>
                    {/* Encabezado de la tabla */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, styles.col1]}>N°</Text>
                        <Text style={[styles.tableCell, styles.col2]}>Apellido</Text>
                        <Text style={[styles.tableCell, styles.col3]}>Nombre</Text>
                        <Text style={[styles.tableCell, styles.col4]}>Cédula</Text>
                        <Text style={[styles.tableCell, styles.col5]}>Email</Text>
                        <Text style={[styles.tableCell, styles.col6]}>Teléfono</Text>
                        <Text style={[styles.tableCell, styles.col7]}>Estado</Text>
                    </View>

                    {/* Filas de datos */}
                    {estudiantes.map((estudiante, index) => (
                        <View style={styles.tableRow} key={estudiante._id}>
                            <Text style={[styles.tableCell, styles.col1]}>{index + 1}</Text>
                            <Text style={[styles.tableCell, styles.col2]}>{estudiante.apellidoEstudiante}</Text>
                            <Text style={[styles.tableCell, styles.col3]}>{estudiante.nombreEstudiante}</Text>
                            <Text style={[styles.tableCell, styles.col4]}>{estudiante.cedulaEstudiante}</Text>
                            <Text style={[styles.tableCell, styles.col5]}>{estudiante.emailEstudiante}</Text>
                            <Text style={[styles.tableCell, styles.col6]}>{estudiante.telefonoEstudiante}</Text>
                            <View style={[styles.tableCell, styles.col7]}>
                                <Text style={estudiante.estadoEstudiante ? styles.statusActive : styles.statusInactive}>
                                    {estudiante.estadoEstudiante ? 'Activo' : 'Inactivo'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Total de estudiantees */}
                <View style={styles.totalEstudiantes}>
                    <Text style={styles.totalText}>
                        Total de estudinates: {estudiantes.length}
                    </Text>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Sistema de Gestión Académica - EPN © 2025
                </Text>
            </Page>
        </Document>
    )
};

export default EstudiantesTablePDF;