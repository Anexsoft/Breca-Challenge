export default function ReportProxy(axios) {
    return {
        dashboard() {
            return axios.get('?route=report&type=dashboard');
        },
        venues() {
            return axios.get('?route=report&type=venues');
        },
        sales(id) {
            return axios.get('?route=report&type=sales&id=' + id);
        }
    }
}