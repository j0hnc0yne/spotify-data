import {useState, useEffect} from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem('theme'); } catch (e) { return null }
    });

    useEffect(() => {
        try {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else if (theme === 'light') {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.removeItem('theme');
            }
        } catch (e) {
            // ignore
        }
    }, [theme]);

    function toggle() {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }

    return (
        <button onClick={toggle} aria-label="Toggle theme" className="ml-4 inline-flex items-center px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm">
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
}
