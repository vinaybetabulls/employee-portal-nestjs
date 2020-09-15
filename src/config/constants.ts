interface VaraibaleInterface {
    EMPLOYEE_PASSWORD: string;
    EMPLOYEE_ROLE: string;
    SUPER_ADMIN_PASSWORD: string;
    SUPER_ADMIN_USERNAME: string;
    SUPER_ADMIN_ROLE: string;
    DEFAULT_ACTION: string;
}

const defaultConstants: VaraibaleInterface = {
    EMPLOYEE_PASSWORD: 'd3ltagamm@',
    EMPLOYEE_ROLE: 'default',
    SUPER_ADMIN_USERNAME: 'superadmin',
    SUPER_ADMIN_PASSWORD: 'superadmin',
    DEFAULT_ACTION: 'view',
    SUPER_ADMIN_ROLE: 'SUPER_ADMIN'
}

export default defaultConstants;