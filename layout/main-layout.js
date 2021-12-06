
import Link from "next/link";

export default function MainLayout({ children }) {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="page-one">
                            <a>Page 1</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="page-two">
                            <a>Page 2</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}