import { useState } from "react";
import styles from "./PolicyModal.module.scss";
import CloseButton from "../Buttons/CloseButton";
import SecundaryButton from "../Buttons/secundaryButton";

const PolicyModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Políticas de uso
    const policies = [
        "1. Acceptance of Terms: By booking or participating in an experience, you agree to these Use Policy.",
        "2. Punctuality: Users are required to arrive at the designated start time and location of the experience. Late arrivals may result in forfeiting the booking.",
        "3. Adherence to Schedule: Users must respect the start and end times of each experience. Extending beyond the scheduled time is not permitted unless explicitly approved.",
        "4. Responsible Behavior: Users are expected to act respectfully and courteously toward other participants, guides, and local communities during the experience.",
        "5. Prohibited Conduct: Aggressive, violent, or disruptive behavior is strictly prohibited unless explicitly indicated as part of the experience (e.g., role-playing activities).",
        "6. Respect for Local Laws and Cultures: Users must comply with local laws and cultural norms in the region where the experience takes place.",
        "7. Safety Compliance: Users must follow all safety instructions provided by the guide or host. Failure to comply may result in removal from the experience.",
        "8. Age and Eligibility Requirements: Some experiences may have age restrictions or specific eligibility criteria. It is the user's responsibility to ensure they meet these requirements before booking.",
        "9. Changes and Cancellations: Hosts reserve the right to modify or cancel an experience due to unforeseen circumstances. Users will be notified and, where applicable, offered an alternative.",
        "10. Policy Updates: We reserve the right to update these policies at any time. Users will be informed of significant changes.",
        "11. Contact: For questions about these policies or specific experiences, contact us at capitravelInfo@gmail.com.",
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.policiesContainer}>
            <div className={styles.policiesContainer1}>
                <h3 className={styles.policyTitle}>Acceptable Use Policy</h3>
                <p>Check our policies to ensure a safe and enjoyable experience.</p>
            </div>
            <div className={styles.policiesContainer2}>
                <SecundaryButton func={openModal}>Check Use policies</SecundaryButton>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <CloseButton func={closeModal} />
                        <h3 className={styles.policyTitle}>Acceptable Use Policy</h3>
                        <div className={styles.policiesGrid}>
                            {policies.map((policy, index) => {
                                const [title, description] = policy.split(":"); // Dividir en título y descripción
                                return (
                                    <div key={index} className={styles.policyItem}>
                                        <strong>{title}:</strong> {description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PolicyModal;