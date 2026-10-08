import { Text } from "../components/text"

export function TextBranch() {
    return (
        <section className="relative w-full overflow-hidden bg-white flex items-center justify-center" style={{ height: '300px' }}>
            <Text rotate="-5deg" reverse={false} />
            <Text rotate="5deg" reverse={true} />
        </section>
    )
}